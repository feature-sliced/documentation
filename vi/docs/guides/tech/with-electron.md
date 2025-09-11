# Sử dụng với Electron

Các ứng dụng Electron có kiến trúc đặc biệt gồm nhiều process với các trách nhiệm khác nhau. Việc áp dụng FSD trong bối cảnh như vậy yêu cầu phải thích nghi cấu trúc với các đặc điểm của Electron.

```
└── src
    ├── app                                 # Common app layer
    │   ├── main                            # Main process
    │   │   └── index.ts                    # Main process entry point
    │   ├── preload                         # Preload script and Context Bridge
    │   │   └── index.ts                    # Preload entry point
    │   └── renderer                        # Renderer process
    │       └── index.html                  # Renderer process entry point
    ├── main
    │   ├── features
    │   │   └── user
    │   │       └── ipc
    │   │           ├── get-user.ts
    │   │           └── send-user.ts
    │   ├── entities
    │   └── shared
    ├── renderer
    │   ├── pages
    │   │   ├── settings
    │   │   │   ├── ipc
    │   │   │   │   ├── get-user.ts
    │   │   │   │   └── save-user.ts
    │   │   │   ├── ui
    │   │   │   │   └── user.tsx
    │   │   │   └── index.ts
    │   │   └── home
    │   │       ├── ui
    │   │       │   └── home.tsx
    │   │       └── index.ts
    │   ├── widgets
    │   ├── features
    │   ├── entities
    │   └── shared
    └── shared                              # Common code between main and renderer
        └── ipc                             # IPC description (event names, contracts)
```

## Quy tắc Public API[​](#quy-tắc-public-api "Link trực tiếp đến heading")

Mỗi process phải có public API riêng của nó. Ví dụ, bạn không thể import các module từ `main` vào `renderer`. Chỉ có thư mục `src/shared` là public cho cả hai process. Nó cũng cần thiết để mô tả các hợp đồng cho tương tác giữa các process.

## Các thay đổi bổ sung cho cấu trúc chuẩn[​](#các-thay-đổi-bổ-sung-cho-cấu-trúc-chuẩn "Link trực tiếp đến heading")

Được đề xuất sử dụng segment `ipc` mới, nơi diễn ra tương tác giữa các process. Các layer `pages` và `widgets`, dựa trên tên gọi của chúng, không nên có mặt trong `src/main`. Bạn có thể sử dụng `features`, `entities` và `shared`. Layer `app` trong `src` chứa các điểm đầu vào cho `main` và `renderer`, cũng như IPC. Không mong muốn các segment trong layer `app` có điểm giao nhau

## Ví dụ về tương tác[​](#ví-dụ-về-tương-tác "Link trực tiếp đến heading")

src/shared/ipc/channels.ts

```
export const CHANNELS = {
    GET_USER_DATA: 'GET_USER_DATA',
    SAVE_USER: 'SAVE_USER',
} as const;

export type TChannelKeys = keyof typeof CHANNELS;
```

src/shared/ipc/events.ts

```
import { CHANNELS } from './channels';

export interface IEvents {
    [CHANNELS.GET_USER_DATA]: {
        args: void,
        response?: { name: string; email: string; };
    };
    [CHANNELS.SAVE_USER]: {
        args: { name: string; };
        response: void;
    };
}
```

src/shared/ipc/preload.ts

```
import { CHANNELS } from './channels';
import type { IEvents } from './events';

type TOptionalArgs<T> = T extends void ? [] : [args: T];

export type TElectronAPI = {
    [K in keyof typeof CHANNELS]: (...args: TOptionalArgs<IEvents[typeof CHANNELS[K]]['args']>) => IEvents[typeof CHANNELS[K]]['response'];
};
```

src/app/preload/index.ts

```
import { contextBridge, ipcRenderer } from 'electron';
import { CHANNELS, type TElectronAPI } from 'shared/ipc';

const API: TElectronAPI = {
    [CHANNELS.GET_USER_DATA]: () => ipcRenderer.sendSync(CHANNELS.GET_USER_DATA),
    [CHANNELS.SAVE_USER]: args => ipcRenderer.invoke(CHANNELS.SAVE_USER, args),
} as const;

contextBridge.exposeInMainWorld('electron', API);
```

src/main/features/user/ipc/send-user.ts

```
import { ipcMain } from 'electron';
import { CHANNELS } from 'shared/ipc';

export const sendUser = () => {
    ipcMain.on(CHANNELS.GET_USER_DATA, ev => {
        ev.returnValue = {
            name: 'John Doe',
            email: 'john.doe@example.com',
        };
    });
};
```

src/renderer/pages/user-settings/ipc/get-user.ts

```
import { CHANNELS } from 'shared/ipc';

export const getUser = () => {
    const user = window.electron[CHANNELS.GET_USER_DATA]();

    return user ?? { name: 'John Donte', email: 'john.donte@example.com' };
};
```

## Xem thêm[​](#xem-thêm "Link trực tiếp đến heading")

* [Process Model Documentation](https://www.electronjs.org/docs/latest/tutorial/process-model)
* [Context Isolation Documentation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
* [Inter-Process Communication Documentation](https://www.electronjs.org/docs/latest/tutorial/ipc)
* [Example](https://github.com/feature-sliced/examples/tree/master/examples/electron)

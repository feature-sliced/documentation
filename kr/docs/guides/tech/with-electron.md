# Electron와 함께 사용하기

Electron 애플리케이션은 역할이 다른 여러 **프로세스**(Main, Renderer, Preload)로 구성됩니다.<br /><!-- -->따라서 FSD를 적용하려면 Electron 특성에 맞게 구조를 조정해야 합니다.

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

## Public API 규칙[​](#public-api-규칙 "해당 헤딩으로 이동")

* 각 프로세스는 자신만의 Public API를 가져야 합니다.

  * 예) `renderer` 코드가 `main` 폴더 모듈을 직접 import 하면 안 됩니다.

* 단, `src/shared` 폴더는 두 프로세스 모두에게 공개됩니다.

  * (프로세스 간 통신 계약과 타입 정의를 위해 필요합니다)

## 표준 구조의 추가 변경 사항[​](#표준-구조의-추가-변경-사항 "해당 헤딩으로 이동")

* **`ipc` segment**를 새로 만들어, 프로세스 간 통신(채널, 핸들러)을 한곳에 모읍니다.
* `src/main`에는 이름 그대로 **`pages`, `widgets` layer를 두지 않습니다.**
  <br />
  <!-- -->
  대신 `features`, `entities`, `shared`만 사용합니다.
* `src/app` layer는 **Main, Renderer entry**와 **IPC initialization code**만 담는 전용 영역입니다.
* `app` layer 내부의 각 segment는 서로 **교차 의존**이 발생하지 않도록 구성하는 것이 좋습니다.

## Interaction example[​](#interaction-example "해당 헤딩으로 이동")

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

## 참고 자료[​](#참고-자료 "해당 헤딩으로 이동")

* [Process Model Documentation](https://www.electronjs.org/docs/latest/tutorial/process-model)
* [Context Isolation Documentation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
* [Inter-Process Communication Documentation](https://www.electronjs.org/docs/latest/tutorial/ipc)
* [Example](https://github.com/feature-sliced/examples/tree/master/examples/electron)

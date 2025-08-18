# Использование с Electron

Electron-приложения имеют особую архитектуру, состоящую из нескольких процессов с разными ответственностями. Применение FSD в таком контексте требует адаптации структуры под специфику Electron.

```
└── src
    ├── app                                 # Общий слой app
    │   ├── main                            # Main процесс
    │   │   └── index.ts                    # Точка входа main процесса
    │   ├── preload                         # Preload скрипт и Context Bridge
    │   │   └── index.ts                    # Точка входа preload
    │   └── renderer                        # Renderer процесс
    │       └── index.html                  # Точка входа renderer процесса
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
    └── shared                              # Общий код между main и renderer
        └── ipc                             # Описание IPC (наименование event'ов, контракты)
```

## Правила для публичного API[​](#правила-для-публичного-api "Прямая ссылка на этот заголовок")

Каждый процесс должен иметь свой публичный API, как пример, нельзя импортировать модули из `main` в `renderer`. Общедоступным между процессами кодом является только папка `src/shared`. Она же необходима для описания контрактов по взаимодействию процессов.

## Дополнительные изменения в стандартной структуре[​](#дополнительные-изменения-в-стандартной-структуре "Прямая ссылка на этот заголовок")

Предлагается использовать новый сегмент `ipc`, в котором происходит взаимодействие между процессами. Слои `pages` и `widgets`, исходя из названия, не должны присутствовать в `src/main`, вы можете использовать `features`, `entities` и `shared`. Слой `app` в `src` содержит точки входа для `main` и `renderer`, а также IPC. Сегментам в слое `app` нежелательно иметь точек пересечения

## Пример взаимодействия[​](#пример-взаимодействия "Прямая ссылка на этот заголовок")

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

## См. также[​](#см-также "Прямая ссылка на этот заголовок")

* [Документация по моделям процессов](https://www.electronjs.org/docs/latest/tutorial/process-model)
* [Документация по изоляции контекстов](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
* [Документация по IPC](https://www.electronjs.org/docs/latest/tutorial/ipc)
* [Пример](https://github.com/feature-sliced/examples/tree/master/examples/electron)

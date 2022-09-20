declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
};

declare module '@site/static/img/*' {
    export default string;
};

declare module '@theme/IdealImage' {
    import type {ReactNode} from 'react';
  
    export interface Props {
      readonly className?: string;
      readonly children?: ReactNode;
      readonly img: string;
      readonly alt: string;
    }
    export default function Image(props: Props): JSX.Element;
}

declare module '@docusaurus/plugin-content-docs/client' {
    export interface Version {
      readonly label: string;
      readonly name: string;
    }
    export function useLatestVersion(): Version;
}


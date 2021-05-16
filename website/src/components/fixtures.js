
import React from "react";
import { 
  LoginOutlined,
  FileProtectOutlined,
  EyeOutlined,
  BlockOutlined,
  ApiOutlined,
  LikeOutlined,
  BuildOutlined,
} from '@ant-design/icons';

export const featureList = [
    {
      title: 'Explicit business-logic',
      Svg: EyeOutlined,
      description: (
        <>
          Архитектуру легко осваивать, поскольку она состоит из доменных модулей
        </>
      ),
    },
    {
      title: 'Adaptability',
      Svg: LoginOutlined,
      description: (
        <>
          Компоненты архитектуры можно независимо менять без непредвиденных последствий
        </>
      ),
    },
    {
      title: 'Tech debt & Refactoring',
      Svg: FileProtectOutlined,
      description: (
        <>
          Каждый модуль можно независимо модифицировать / переписать без сайд-эффектов
        </>
      ),
    },
    {
      title: 'Explicit sharing',
      Svg: BuildOutlined,
      description: (
        <>
          Сохраняется баланс между принципом <code>DRY</code> и кастомизацией
        </>
      ),
    },
  ];

  
export const conceptsList = [
  {
    title: 'Public API',
    Svg: ApiOutlined,
    description: (
      <>
        Каждый модуль должен иметь на верхнем уровне декларацию <b>своего публичного API</b>
      </>
    ),
  },
  {
    title: 'Isolation',
    Svg: BlockOutlined,
    description: (
      <>
        Модуль не должен <b>зависеть напрямую</b> от других модулей того же слоя или вышележаших слоев
      </>
    ),
  },
  {
    title: 'Needs driven',
    Svg: LikeOutlined,
    description: (
      <>
        Ориентирование <b>на потребности бизнеса и пользователя</b>
      </>
    ),
  },
];

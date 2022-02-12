# Docusaurus OpenGraph image generator plugin
Как это работает?
Для манипуляций с изображениями используется [sharp](https://sharp.pixelplumbing.com/) работающий через `libvips`. На этапе postBuild, когда у нас всё собрано, получаем инфу из doc плагина и на её основе генерируем изображение с необходимыми нам дополнительными слоями. Сами изображения и слои описываем в наших шаблонах. Если нам нужно применить конкретный шаблон для конкретного документа - используем правила.

## Usage
Шаблоны помещаются в папку `open-graph-templates`. Для настройки плагина используется `config.json`.  
Шаблонов может быть сколько угодно много, но при этом (Важно!) `basic` обязательный для работы плагина.


### Templates folder files listing.
```sh
└── 
    └── open-graph-tempaltes/ 
        # required
        ├── basic
        |     ├── font.ttf
        |     ├── preview.png
        |     └── template.json
        |
        └── config.json
```

### Templates configuration file example:  
**config.json**
```json
{
  "outputDir": "assets/og",
  "textWidthLimit": 1100,
  "quality": 70,
  "rules": [
    {
      "name": "basic",
      "priority": 0,
      "pattern": "."
    },
    {
      "name": "gray",
      "priority": 1,
      "pattern": "^concepts*"
    },
    {
      "name": "gray",
      "priority": 2,
      "pattern": "^about*"
    }
  ]
}

```
`outputDir` - выходная директория в билде для наших картинок.  
`textWidthLimit` - ограничение по длине текстовой строки, при превышении которого шрифт будет скейлиться.  
`quality` - качество(компрессия JPEG Quality) картинки на выходе.
`rules` - правила(их может быть сколько угодно много), по которым будет применяться тот или иной шаблон в зависимости от пути до документа(позволяет нам для разных эндпоинтов док, создавать свои превьюшки):
- `rules.name` - имя шаблона (название папки в open-graph-templates)
- `rules.priority` - приоритет, правило с более высоким приоритетом замещает собой правила с более низким.
- `rules.pattern` - RegExp шаблон, по которому сравнивается путь документа для применения того или иного правила.  


### Template configuration example:  
**template.json**
```json
{
  "image": "preview.png",
  "font": "arial.ttf",
  "layout": [
    {
      "type": "text",
      "name": "title",
      "fontSize": 80,
      "fill": "white",
      "stroke": "white",
      "top": 400,
      "left": 200
    }
  ]
}
```
`image` - путь до изображения на основе которого шаблон будет делать preview.  
`font` - используемый файл шрифта.  
`layout` - описывает накладываемые слои и их расположение:  
- `layout.type` - задел на будущее пока только "text", в дальнейшем планируется image, postEffect и тд.
- `layout.name` - на данный момент для text типа получает поле из плагина doc, полезные варианты: title, description, formattedLastUpdatedAt остальные поля очень спорны для применения.
- `layout.fontSize` - размер шрифта для слоя с типом text.
- `layout.fill` - цвет заливки букв для слоя с типом text.
- `layout.stroke` - цвет контура букв для слоя с типом text.
- `layout.top`, `layout.left` - отступ нашего слоя от края изображения.

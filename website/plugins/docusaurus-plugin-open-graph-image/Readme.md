# Docusaurus OpenGraph image generator plugin


### Templates folder files listing.
```sh
└── website/
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

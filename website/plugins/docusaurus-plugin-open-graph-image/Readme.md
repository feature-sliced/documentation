# Docusaurus OpenGraph image generator plugin


Templates configuration file example:  
**config.json**
```json
{
  "outputDir": "",
  "rules": {
    "basic": {
      "priority": 0,
      "pattern": "*"
    },
    "gray": {
      "priority": 1,
      "pattern": "*"
    }
  }
}
```

Template configuration example:  
**template.json**
```json
{
  "image": "preview.png",
  "font": "arial.ttf",
  "layout": [
    {
      "type": "text",
      "name": "label",
      "fontSize": 72,
      "fill": "white",
      "stroke": "white",
      "top": 20,
      "left": 20
    },
    {
      "type": "text",
      "name": "description",
      "fontSize": 64,
      "fill": "white",
      "stroke": "white",
      "top": 40,
      "left": 120
    }
  ]
}

```

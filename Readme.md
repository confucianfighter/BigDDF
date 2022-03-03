# Setting Up Typscript
##### /Users/daylannance/Documents/DEV/DDF/.vscode/tasks.json
##### /Users/daylannance/Documents/DEV/DDF/.vscode/launch.json
##### /Users/daylannance/Documents/DEV/DDF/NodeJS Backend/ package.json
###### /Users/daylannance/Documents/DEV/DDF/NodeJSBackend/tsconfig.json
###### /Users/daylannance/Documents/DEV/DDF/SERVER/.vscode/launch.json

```mermaid
sequenceDiagram
    PlayButton->>launch.json:Launch coin gecko service.ts
    launch.json->>tasks.json: npm: build_NodeJSBackend
    tasks.json ->>NodeJS Backend/package.json: build
```
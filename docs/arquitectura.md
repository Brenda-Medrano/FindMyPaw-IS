# Arquitectura MVP (Modelo–Vista–Presentador)

```mermaid
flowchart LR
 U[Usuario] --> V[Vista React]
 V --> P[Presenter]
 P --> M[Modelo: reglas]
 P --> R[Repositorios]
 R --> L[(LocalStorage)]
```

La vista muestra formularios. El Presenter coordina las acciones. El Modelo valida datos sin conocer React. El repositorio guarda y consulta los datos.

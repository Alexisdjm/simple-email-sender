

# Docker image and usage

1. Start building the docker image

``` docker build -t simple-email-sender . ```

2. Run the image with the environment variables 

``` docker run -d -p 3000:3000 -e PORT=3000 -e EMAIL_SENDER=mymail@example.com -e SMTP_USER=a44e8e001@smtp-brevo.com -e PASSWORD="your_brevo_password" -e ALLOWED_FIELDS="nombre,apellido,tipoProyecto,email,message" -e REQUIRED_FIELDS="nombre,email,message" -e FIELD_LABELS="nombre:Nombre,apellido:Apellido,tipoProyecto:Tipo de proyecto,email:Email,message:Mensaje" simple-email-sender ```

3. Verify the app making a GET request to ```localhost:3000/dummy/test``` the request must return something like this:

```
{
    "msg": "API Loaded",
    "enviromentSetted": {
        "EMAIL_SENDER": true,
        "EMAIL_RECEIVER": false,
        "PASSWORD": true
    }
} 

```

# NOTES

## Required environment variables:
- **PORT**: Puerto del servidor (ej: 3000)
- **EMAIL_SENDER**: Email que aparece como remitente
- **SMTP_USER**: Usuario SMTP de Brevo (ej: a44e8e001@smtp-brevo.com)
- **PASSWORD**: Contraseña SMTP de Brevo

## Optional variables:
- **EMAIL_RECEIVER**: Email destinatario (si no se especifica, usa EMAIL_SENDER)
- **ALLOWED_FIELDS**: Lista de campos del body que se incluyen en el correo, separados por coma (ej: `nombre,apellido,email,message`). Si no se define, se incluyen todos los campos enviados en el POST.
- **REQUIRED_FIELDS**: Campos obligatorios, separados por coma. Si no se define, se exige `message` (compatibilidad con jobs actuales).
- **FIELD_LABELS**: Etiquetas para el correo. Formato `clave:Etiqueta,clave2:Etiqueta 2` o JSON `{"nombre":"Nombre"}`. Si no se define, se usa el nombre del campo.
- **MAIL_SUBJECT**: Asunto del correo. Por defecto: `Te han contactado desde tu página web`

Los nombres de `ALLOWED_FIELDS` y `REQUIRED_FIELDS` deben coincidir con el atributo `name` del input (o la clave JSON del POST), no con el `id` del HTML.

Ejemplo de body para un job configurado con 5 campos:

```
{
  "nombre": "Ana",
  "apellido": "Pérez",
  "tipoProyecto": "Landing",
  "email": "ana@example.com",
  "message": "Quiero cotizar un proyecto"
}
```

Cada job de Jenkins puede definir un conjunto distinto de estas variables sobre la misma imagen.
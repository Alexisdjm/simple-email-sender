

# Docker image and usage

1. Start building the docker image

``` docker build -t simple-email-sender . ```

2. Run the image with the environment variables 

``` docker run -d -p 3000:3000 -e PORT=3000 -e EMAIL_SENDER=mymail@example.com -e SMTP_USER=a44e8e001@smtp-brevo.com -e PASSWORD="your_brevo_password" simple-email-sender ```

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
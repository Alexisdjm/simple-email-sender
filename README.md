

# Docker image and usage

1. Start building the docker image

``` docker build -t simple-email-sender . ```

2. Run the image with the environment variables 

``` docker run -d -p 3000:3000 -e PORT=3000 -e EMAIL_SENDER=mymail@gmail.com -e PASSWORD="xxxx xxxx xxxx xxxx" simple-email-sender ```

3. Verify the app making a GET request to ```localhost:3000/api/dummy/test``` the request must return something like this:

```
{
    "msg": "API Loaded",
    "enviromentSetted": {
        "EMAIL_SENDER": true,
        "EMAIL_RECEIVER": false,
        "PASSWORD": true,
        "TITLE": true,
    }
} 

```

# NOTES

## The PORT, PASSWORD and EMAIL_SENDER variables are required
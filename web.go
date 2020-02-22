package main

import (
    "context"
    "fmt"
    "github.com/aws/aws-lambda-go/lambda"
    "github.com/jonbooz/emailsender/models"
)

func HandleRequest(ctx context.Context, event models.EmailSenderRemoteEvent) (models.WebResponse, error) {
    return models.WebResponse{Greeting:fmt.Sprintf("Hello, %s", event.Context.User.Name)}, nil
}

func main() {
    lambda.Start(HandleRequest)
}

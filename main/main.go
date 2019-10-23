package main

import (
    "context"
    "fmt"
    "github.com/aws/aws-lambda-go/lambda"
)

func HandleRequest(ctx context.Context, event EmailSenderRemoteEvent) (string, error) {
    return fmt.Sprintf("Hello %s!", event.Context.User.Name ), nil
}

func main() {
    lambda.Start(HandleRequest)
}
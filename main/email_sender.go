package main

type EmailSenderUser struct {
	Name string `json:"name"`
	Email string `json:"email"`
}

type EmailSenderContext struct {
	User EmailSenderUser `json:"user"`
}

type EmailSenderRemoteEvent struct {
	Context EmailSenderContext `json:"context"`
}

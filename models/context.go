package models

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

type WebResponse struct {
	Greeting string `json:"greeting"`
}

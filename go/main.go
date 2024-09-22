package main

import (
	"encoding/json"
	"net/http"
)

type Profile struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

var profiles = make(map[string]Profile)

func createProfile(w http.ResponseWriter, r *http.Request) {
	var profile Profile
	err := json.NewDecoder(r.Body).Decode(&profile)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
}

func getProfile(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		profileList := make([]Profile, 0, len(profiles))
		for _, profile := range profiles {
			profileList = append(profileList, profile)
		}
	}
}

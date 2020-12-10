package com.mriduava.anbud.controllers;

import com.mriduava.anbud.entities.Message;
import com.mriduava.anbud.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/messages")
public class MessageController {

    @Autowired
    MessageService messageService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PostMapping
    public ResponseEntity<Boolean> postNewMessage(@RequestBody Message message) {
        boolean isSaved = messageService.postNewMessage(message);
        return ResponseEntity.ok(isSaved);
    }
}

package com.mriduava.anbud.services;

import com.mriduava.anbud.entities.Message;
import com.mriduava.anbud.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepo messageRepo;

    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }

    public Message postNewMessage(Message message) {
        return messageRepo.save(message);
    }


}

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

    @Autowired
    SocketService socketService;

    public List<Message> getAllMessages() {
        return messageRepo.findAll();
    }

    public boolean postNewMessage(Message message) {
        Message savedMessage = messageRepo.save(message);
        socketService.sendToAll(savedMessage);
        return savedMessage.getId() > 0;
    }


}

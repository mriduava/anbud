package com.mriduava.anbud.services;

import com.mriduava.anbud.dtos.SocketDTO;
import com.mriduava.anbud.entities.Message;
import com.mriduava.anbud.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
        message.setTimestamp(Instant.now().toEpochMilli());
        Message savedMessage = messageRepo.save(message);
        SocketDTO socketMessage = new SocketDTO("message", savedMessage);
        socketService.sendToAllClient(socketMessage);
        return savedMessage.getId() > 0;
    }
}

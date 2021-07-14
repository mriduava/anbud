package com.mriduava.anbud.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mriduava.anbud.entities.AuctionItem;
import com.mriduava.anbud.entities.Bid;
import com.mriduava.anbud.entities.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SocketService {

    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    MessageService messageService;
    @Autowired
    AuctionService auctionService;
    @Autowired
    BidService bidService;

    private List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    public void sendToOne(WebSocketSession webSocketSession, String message) throws IOException {
        webSocketSession.sendMessage(new TextMessage(message));
    }

    public void sendToOneClient(WebSocketSession webSocketSession, Object obj) throws IOException {
        String json = objectMapper.writeValueAsString(obj);
        sendToOne(webSocketSession, json);
    }

    public void sendToAllClient(Object obj) {
        try {
            sendToAll(objectMapper.writeValueAsString(obj));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void sendToAll(String message) {
        TextMessage msg = new TextMessage(message);
        for(WebSocketSession webSocketSession : sessions) {
            try {
                webSocketSession.sendMessage(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void addSession(WebSocketSession session) {
        sessions.add(session);
    }

    public void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }

    public void saveNewMessage(Message message) {
        messageService.postNewMessage(message);
    }

    public void saveNewAuction(AuctionItem auctionItem) {
        auctionService.postNewAuction(auctionItem);
    }

    public void saveNewBid(Bid bid) {
        bidService.postNewBid(bid);
    }

}
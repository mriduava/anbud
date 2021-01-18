package com.mriduava.anbud.services;

import com.mriduava.anbud.dtos.AuctionSocketDTO;
import com.mriduava.anbud.entities.AuctionItem;
import com.mriduava.anbud.repositories.AuctionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionService {
    @Autowired
    AuctionRepo auctionRepo;

    @Autowired
    SocketService socketService;

    public List<AuctionItem> getAllAuctions() {
        return auctionRepo.findAll();
    }


    public boolean postNewAuction(AuctionItem auctionItem) {
        AuctionItem savedAuction = auctionRepo.save(auctionItem);
        AuctionSocketDTO socketData = new AuctionSocketDTO("data", savedAuction);
        socketService.sendToAll(socketData);
        return savedAuction.getId() > 0;
    }
}

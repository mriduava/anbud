package com.mriduava.anbud.services;

import com.mriduava.anbud.dtos.SocketDTO;
import com.mriduava.anbud.entities.AuctionItem;
import com.mriduava.anbud.repositories.AuctionRepo;
import com.mriduava.anbud.repositories.BidRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionService {
    @Autowired
    AuctionRepo auctionRepo;

    @Autowired
    SocketService socketService;

    @Autowired
    BidRepo bidRepo;

    AuctionItem auctionItem;
    public List<AuctionItem> getAllItems() {
        return auctionRepo.findAll();
    }

    public Optional<AuctionItem> getOneItem(Long id) {
        return auctionRepo.findById(id);
    }

    public boolean postNewAuction(AuctionItem auctionItem) {
        AuctionItem savedAuction = auctionRepo.save(auctionItem);
        SocketDTO socketData = new SocketDTO("auction", savedAuction);
        socketService.sendToAllClient(socketData);
        return savedAuction.getId() > 0;
    }

    public List<AuctionItem> getByItemName(String item_name) {
        return auctionRepo.findAuctionByName(item_name);
    }

}

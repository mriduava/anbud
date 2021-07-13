package com.mriduava.anbud.services;

import com.mriduava.anbud.dtos.SocketDTO;
import com.mriduava.anbud.entities.Bid;
import com.mriduava.anbud.repositories.BidRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BidService {
    @Autowired
    BidRepo bidRepo;

    @Autowired
    SocketService socketService;

    public List<Bid> getAllBids() {
        return bidRepo.findAll();
    }

    public Optional<Bid> getBidById(Long id) {
        return bidRepo.findById(id);
    }

    public boolean postNewBid(Bid bid) {
        Bid savedBid = bidRepo.save(bid);
        SocketDTO socketData = new SocketDTO("bid", savedBid);
        socketService.sendToAll(socketData);
        return savedBid.getId() > 0;
    }
}


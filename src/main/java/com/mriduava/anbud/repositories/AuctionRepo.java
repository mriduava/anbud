package com.mriduava.anbud.repositories;

import com.mriduava.anbud.entities.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepo extends JpaRepository<AuctionItem, Long> {
    @Query(value = "SELECT * FROM auction_items WHERE item_name LIKE %:name%", nativeQuery = true)
    List<AuctionItem> findAuctionByName(@Param("name") String name);

    @Query(value = "SELECT * FROM auction_items WHERE owner_id = :ownerId", nativeQuery = true)
    List<AuctionItem> findAuctionByOwner(@Param("ownerId") int ownerId);
}

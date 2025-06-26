package com.elhabhab.backend.entity;

import com.elhabhab.backend.dto.request.WishListDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Entity
@Data
public class WishList {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




    @ManyToOne(fetch =  FetchType.LAZY , optional = false)
    @JoinColumn( name = "user_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public WishListDto getWishlistDto(){
        WishListDto wishlistDto = new WishListDto();

        wishlistDto.setId(id);


        return wishlistDto;

    }
}

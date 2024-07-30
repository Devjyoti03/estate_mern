import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const createUser = asyncHandler(async(req, res)=> {
    console.log("creating an user");

    let {email} = req.body;
    // console.log(email);
    const userExists = await prisma.user.findUnique({where: {email: email}})
     if (!userExists){
        const user = await prisma.user.create({data: req.body})
        res.send({
            message : "User registered successfully",
            user: user,
        });
    }
    else
        res.status(201).send({message: "User already registered"})
});

export const bookVisit = asyncHandler(async(req,res)=>{
    const {email, date} = req.body;
    const {id} = req.params;

    try{
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        if (alreadyBooked.bookedVisits.some((visit)=> visit.id===id)){
            res.status(400).json({message: "This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where: {email: email},
                data:{
                    bookedVisits: {push: {id, date}}
                }
            })
            res.send("Booked successfully");
        }
    }catch(err){
        throw new Error(err.message)
    }
});

export const getAllBook = asyncHandler(async(req,res)=>{
    const {email} = req.body;

    try{
        const books = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        res.status(200).send(books)
    }catch(err){
        throw new Error(err.message)
    }
});

export const cancelBook = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        const index = user.bookedVisits.findIndex((visit)=> visit.id === id)
        if(index === -1){
            res.status(404).json({message: "Booking not found"})
        }else{
            user.bookedVisits.splice(index,1)
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Booking cancel successfully")
        }
    }catch(err){
        throw new Error(err.message)
    }
});

export const toFav = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(user.favResID.includes(rid)){
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResID: {
                        set: user.favResID.filter((id)=> id !== rid)
                    }
                }
            });
            res.send({message: "Removed from Favourites", user: updateUser})
        }
        else{
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResID: {
                        push: rid
                    }
                }
            });
            res.send({message: "Updated Favourites", user: updateUser})
        }
    }catch(err){
        throw new Error(err.message)
    }
});

export const getAllFav = asyncHandler(async(req,res)=>{
    const {email} = req.body;

    try{
        const favs = await prisma.user.findUnique({
            where: {email},
            select: {favResID: true}
        })
        res.status(200).send(favs)
    }catch(err){
        throw new Error(err.message)
    }
});
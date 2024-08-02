import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const createRes = asyncHandler(async (req, res) => {
  const { title, description, price, address, city, country, image, facilities, userEmail } = req.body.data;
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    console.error(err); // Log the full error object
    if (err.code === "P2002") {
      return res.status(409).send({ message: "Residency already exists." });
    }
    res.status(500).send({ message: "An unexpected error occurred." });
  }
});


export const getAll = asyncHandler(async(req, res)=>{
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.send(residencies);
});

export const getRes = asyncHandler(async(req, res)=> {
    const {id} = req.params;
    try{
        const residency = await prisma.residency.findUnique({
            where: {id}
        })
        res.send(residency);
    }catch(err){
        throw new Error(err.message)
    }
})

export const deleteResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the residency with the given id
        await prisma.residency.delete({
            where: { id }
        });

        res.send({ message: "Residency deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

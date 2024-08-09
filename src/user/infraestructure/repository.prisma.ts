import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { IUserRepository } from "../domain/iuser.repository";
import { User } from "../domain/user";

export class UserRepositoryPrisma implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async signup(user: User): Promise<User> {
    const userSaved = await this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        photo: user.photo,
        cheeses: user.cheeses,
        params: user.params as any, // Usamos 'as any' para evitar problemas de tipo
      },
    });

    if (!userSaved) {
      throw new Error("Ocurrió un error al guardar el usuario");
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async signin(user: User): Promise<User> {
    const userSaved = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!userSaved) {
      throw new Error("Invalid credentials");
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async update(id: string, firstName: string, lastName: string, email: string): Promise<User> {
    const userSaved = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });

    if (!userSaved) {
      throw new Error("Ocurrió un error al guardar el usuario");
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const userSaved = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });

    if (!userSaved) {
      throw new Error("Ocurrió un error al guardar el usuario");
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async updateParams(id: string, params: any): Promise<User> {
    const userSaved = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        params: params,
      },
    });

    if (!userSaved) {
      throw new Error("Ocurrió un error al guardar el usuario");
    }

    console.log(userSaved);

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userSaved = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userSaved) {
      return null;
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  async findById(id: string): Promise<User> {
    const userSaved = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!userSaved) {
      throw new Error("User not found");
    }

    return this.mapPrismaUserToDomainUser(userSaved);
  }

  private mapPrismaUserToDomainUser(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.firstName,
      prismaUser.lastName,
      prismaUser.email,
      prismaUser.password,
      prismaUser.photo,
      prismaUser.cheeses,
      (prismaUser as any).params // Usamos 'as any' para evitar problemas de tipo
    );
  }
}
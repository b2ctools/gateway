import { ctxSrv } from "../../context.service";
import { ID } from "../repository.interface";

/** Generic Entity */

export abstract class IEntity {
  createdAt: Date;
  createdBy: ID;

  updatedAt: Date;
  updatedBy: ID;

  deletedAt: Date;
  deletedBy: ID;

  toCreate() {

    this.createdAt = new Date();
    this.createdBy = ctxSrv.getUserId();

    this.updatedAt = null;
    this.updatedBy = null;

    this.deletedAt = null;
    this.deletedBy = null;

    return this;
  }

  toUpdate() {
    this.updatedAt = new Date();
    this.updatedBy = ctxSrv.getUserId();
    return this;
  }
}

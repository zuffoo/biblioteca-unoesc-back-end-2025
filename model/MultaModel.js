import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'multa',
    {
        idmulta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idemprestimo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        valor: {
            type: DataTypes.NUMBER(11,2),
            allowNull: false
        },
        vencimento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        pagamento: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }
  )
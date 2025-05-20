import { DataTypes } from "sequelize";
import banco from "../banco.js";

export default banco.define(
    'categoria',
    {
        idcategoria:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nomecategoria:{
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }
)
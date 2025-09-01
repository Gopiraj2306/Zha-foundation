const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database"); // adjust path
const School = require("./school");   // make sure this exists
const User = require("./user");       // make sure this exists
const Designation = require("./designation");

const SocialCoach = sequelize.define(
  "SocialCoach",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    // 🔗 Foreign keys
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "schools", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    school_name: { type: DataTypes.STRING },
    school_code: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    join_date: { type: DataTypes.DATEONLY },
    password: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    mobile_number: { type: DataTypes.STRING },
    designation: { type: DataTypes.STRING },
    department: { type: DataTypes.STRING },
    date_of_birth: { type: DataTypes.DATEONLY },
    blood_group: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    address_line1: { type: DataTypes.STRING },
    address_line2: { type: DataTypes.STRING },
    address_line3: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: "social_coaches",
    timestamps: false, // using custom timestamps
  }
);

// Associations
SocialCoach.belongsTo(School, { foreignKey: "school_id" });
SocialCoach.belongsTo(User, { foreignKey: "user_id" });
SocialCoach.belongsTo(Designation, {foreignKey :"designation_id" })

module.exports = SocialCoach;

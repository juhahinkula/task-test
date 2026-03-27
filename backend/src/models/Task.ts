import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public status!: 'todo' | 'in-progress' | 'done';
  public priority!: 'low' | 'medium' | 'high';
  public dueDate!: Date | null;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 200]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('todo', 'in-progress', 'done'),
      allowNull: false,
      defaultValue: 'todo'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['priority']
      }
    ]
  }
);

// Define associations
User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks'
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export default Task;

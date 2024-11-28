import mongoose from "mongoose";

const resturantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    ownerId: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0.00,
    },
    balance:{
      type: Number,
      default: 0.00,

    },
    seats: {
      friday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      saturday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      sunday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      monday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      tuesday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      wednesday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
      thursday: {
        breakfast: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        lunch: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
        dinner: {
          bookings: {
            type: Number,
            default: 0,
          },
          total: {
            type: Number,
            default: 0,
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Resturant = mongoose.model("Resturant", resturantSchema);

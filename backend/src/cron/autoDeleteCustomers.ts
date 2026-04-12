import cron from "node-cron";
import customerModal from "../models/customer.model.js";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
// const THIRTY_DAYS = 2 * 60 * 1000;

export const startAutoDeleteJob = () => {
    cron.schedule("* * * * *", async () => {
        console.log("Running auto delete job...");

        await customerModal.deleteMany({
            deletedAt: {
                $ne: null,
                $lt: new Date(Date.now() - THIRTY_DAYS),
            },
        });

        console.log("Old customers deleted");
    });
};
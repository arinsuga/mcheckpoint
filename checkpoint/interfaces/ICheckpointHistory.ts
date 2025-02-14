export default interface ICheckpointHistory {
    id: string;
    user_id: string;
    name: string;
    attend_dt: string;
    checkin_time: string;
    checkin_address: string;
    checkin_description: string;
    checkout_time: string;
    checkout_address: string;
    checkout_description: string;
    time_elapse: string;
}

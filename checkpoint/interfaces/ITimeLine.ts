export default interface ITimeLine {
    time: string;
    type: 'Checkin' | 'Checkout';
    title: string;
    subtitle: string;
    location: string;
}


CREATE TABLE actions_in_rooms
(
    room_name   text not null,
    action      json not null,
    action_time timestamp
);

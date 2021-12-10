CREATE TABLE actions_in_rooms
(
    room_name   text not null,
    action      json not null,
    action_time timestamp not null
);

CREATE TABLE actions_in_rooms_archive
(
    room_name   text not null,
    action      json not null,
    action_time timestamp not null
);

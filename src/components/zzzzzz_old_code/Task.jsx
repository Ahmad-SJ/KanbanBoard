import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const TextContent = styled.div``;

const Icon = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: blue;
  border-radius: 50%;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7d5"
      : "DCDCDC"
    : props.isBacklog
    ? "#F2D7d5"
    : "#fffada";
}

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div>
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                padding: "2px",
              }}
            >
              <span>
                <small>#{task.id}</small>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2px",
              }}
            >
              <TextContent>{task.title}</TextContent>
            </div>
            <Icon>
              <div>
                <Avatar />
              </div>
            </Icon>
            {provided.placeholder}
          </Container>
        </div>
      )}
    </Draggable>
  );
}

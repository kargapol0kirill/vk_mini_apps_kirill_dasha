import React, {useState, Fragment, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar, CardGrid, ContentCard, FixedLayout, Separator, WriteBar, WriteBarIcon } from '@vkontakte/vkui';

//получение класса IO
import io from 'socket.io-client'

//адресс сервера
//требуется перенаправление зхапросов - смотрите ниже

const Home = ({ id, go, fetchedUser, messages, sendMessage }) => {

	const [text, setText] = useState("");

  const handleChangeText = (e) => {
    setText(e.target.value) }

  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed)
    {
      sendMessage({messageText: text, senderName: `${fetchedUser.first_name} ${fetchedUser.last_name}`})
      setText('')
    }  
  }

	return (

	<Panel id={id}>
		<PanelHeader>UmpaLumpa</PanelHeader>
		{/*fetchedUser &&
		<Group header={<Header mode="secondary">Добро пожаловать</Header>}>
			<Cell
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</Cell>
		</Group>*/}


		

		{/*<Group header={<Header mode="secondary">Navigation Example</Header>}>
			<Div>
				<Button stretched size="l" mode="secondary" onClick={go} data-to="persik">
					Show me the Persik, please
				</Button>
			</Div>
		</Group>*/}

		<Group>
          <CardGrid size="l"
            style={{marginBottom:54}}>
            {messages.map((msg)=> (
              <ContentCard
                key={msg.messageId}
                src={msg.avatar}
                header={msg.senderName}
                text={msg.messageText}
                caption={msg.cretedAt}
              />
            ))}
          </CardGrid>
        </Group>

		<FixedLayout vertical="bottom">
            <Separator wide />

            {/*isAttachmentsShown && (
              <div>
                <Div>Интерфейс прикрепления</Div>
                <Separator wide />
              </div>
            )*/}

            <WriteBar
      
              after={
                <Fragment>
                  { <WriteBarIcon mode="send" 
                  onClick = {handleSendMessage}/>}
                </Fragment>
              }
              value={text}
              onChange={handleChangeText}
              placeholder="Сообщение"
            />
        </FixedLayout>



	</Panel>
	)
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;

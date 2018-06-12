// @flow
import React from 'react'
import I from 'immutable'
import {Box2} from '../../../../common-adapters'
import * as Types from '../../../../constants/types/chat2'
import {storiesOf, action} from '../../../../stories/storybook'
import * as PropProviders from '../../../../stories/prop-providers'
import Thread from './old.desktop'
import * as Message from '../../../../constants/chat2/message'
import HiddenString from '../../../../util/hidden-string'

const ordinals = []
for (var i = 0; i < 100; ++i) {
  ordinals.push(Types.numberToOrdinal(1000 - i))
}
const messageOrdinals = I.List(ordinals)
const conversationIDKey = Types.stringToConversationIDKey('a')

const props = {
  conversationIDKey,
  editingOrdinal: null,
  lastLoadMoreOrdinal: null,
  listScrollDownCounter: 0,
  loadMoreMessages: action('onLoadMoreMessages'),
  messageOrdinals,
  onFocusInput: action('onFocusInput'),
  onToggleInfoPanel: action('onToggleInfoPanel'),
}

class Rnd {
  _seed = 0
  constructor(seed) {
    this._seed = seed
  }

  next = () => {
    this._seed = (this._seed * 16807) % 2147483647
    return this._seed
  }
}

// prettier-ignore
const words = ['At', 'Et', 'Itaque', 'Nam', 'Nemo', 'Quis', 'Sed', 'Temporibus', 'Ut', 'a', 'ab', 'accusamus', 'accusantium', 'ad', 'alias', 'aliquam', 'aliquid', 'amet', 'animi', 'aperiam', 'architecto', 'asperiores', 'aspernatur', 'assumenda', 'atque', 'aut', 'autem', 'beatae', 'blanditiis', 'commodi', 'consectetur', 'consequatur', 'consequatur', 'consequatur', 'consequuntur', 'corporis', 'corrupti', 'culpa', 'cum', 'cumque', 'cupiditate', 'debitis', 'delectus', 'deleniti', 'deserunt', 'dicta', 'dignissimos', 'distinctio', 'dolor', 'dolore', 'dolorem', 'doloremque', 'dolores', 'doloribus', 'dolorum', 'ducimus', 'ea', 'eaque', 'earum', 'eius', 'eligendi', 'enim', 'eos', 'eos', 'error', 'esse', 'est', 'est', 'et', 'eum', 'eveniet', 'ex', 'excepturi', 'exercitationem', 'expedita', 'explicabo', 'facere', 'facilis', 'fuga', 'fugiat', 'fugit', 'harum', 'hic', 'id', 'id', 'illo', 'illum', 'impedit', 'in', 'inventore', 'ipsa', 'ipsam', 'ipsum', 'iste', 'iure', 'iusto', 'labore', 'laboriosam', 'laborum', 'laudantium', 'libero', 'magnam', 'magni', 'maiores', 'maxime', 'minima', 'minus', 'modi', 'molestiae', 'molestias', 'mollitia', 'natus', 'necessitatibus', 'neque', 'nesciunt', 'nihil', 'nisi', 'nobis', 'non-numquam', 'non-provident', 'non-recusandae', 'nostrum', 'nulla', 'obcaecati', 'odio', 'odit', 'officia', 'officiis', 'omnis', 'optio', 'pariatur', 'perferendis', 'perspiciatis', 'placeat', 'porro', 'possimus', 'praesentium', 'quae', 'quaerat', 'quam', 'quas', 'quasi', 'qui', 'quia', 'quibusdam', 'quidem', 'quis', 'quisquam', 'quo', 'quod', 'quos', 'ratione', 'reiciendis', 'rem', 'repellat', 'repellendus', 'reprehenderit', 'repudiandae', 'rerum', 'saepe', 'sapiente', 'sed', 'sequi', 'similique', 'sint', 'sint', 'sit', 'sit', 'soluta', 'sunt', 'sunt', 'suscipit', 'tempora', 'tempore', 'tenetur', 'totam', 'ullam', 'unde', 'ut', 'vel', 'velit', 'velit', 'veniam', 'veritatis', 'vero', 'vitae', 'voluptas', 'voluptate', 'voluptatem', 'voluptatem', 'voluptatem', 'voluptates', 'voluptatibus', 'voluptatum']

const ordinalToMessage = o => {
  const r = new Rnd(1234)
  for (var i = 0; i < o; ++i) {
    r.next()
  }

  const offset = r.next()
  const loops = r.next() % 100

  let extra = ''
  for (var j = 0; j < loops; ++j) {
    extra += ' ' + words[(j + offset) % words.length]
  }

  return Message.makeMessageText({
    text: new HiddenString(String(o) + extra),
  })
}

const provider = PropProviders.compose(
  PropProviders.Usernames(['max', 'cnojima', 'cdixon'], 'ayoubd'),
  PropProviders.Avatar(['following', 'both'], ['followers', 'both']),
  {
    Channel: p => ({name: p.name}),
    Mention: p => ({username: p.username}),
    BottomMessage: p => ({
      showResetParticipants: null,
      showSuperseded: null,
      measure: null,
    }),
    TopMessage: p => ({
      conversationIDKey,
      hasOlderResetConversation: false,
      showRetentionNotice: false,
      loadMoreType: 'moreToLoad',
      showTeamOffer: false,
      measure: null,
    }),
    MessageFactory: ({ordinal, previous}) => ({
      message: ordinalToMessage(ordinal),
      previous: ordinalToMessage(previous),
      isEditing: false,
      measure: null,
    }),
    MessagePopupText: p => ({
      attachTo: null,
      author: 'a',
      deviceName: 'a',
      deviceRevokedAt: 0,
      deviceType: 'mobile',
      onCopy: action('oncopy'),
      onDelete: null,
      onDeleteMessageHistory: null,
      onEdit: null,
      onHidden: action('onhidden'),
      onQuote: null,
      onReplyPrivately: null,
      onViewProfile: action('onviewprofile'),
      position: 'top left',
      showDivider: false,
      timestamp: 0,
      visible: false,
      yourMessage: false,
    }),
    Wrapper: p => ({
      author: 'a',
      exploded: false,
      explodedBy: '',
      explodesAt: 0,
      exploding: false,
      failureDescription: '',
      includeHeader: false,
      innerClass: p.innerClass,
      isBroken: false,
      isEdited: false,
      isEditing: false,
      isExplodingUnreadable: false,
      isFollowing: false,
      isRevoked: false,
      isYou: false,
      measure: null,
      message: p.message,
      messageFailed: false,
      messageKey: p.message.ordinal,
      messagePending: false,
      messageSent: true,
      onRetry: null,
      onEdit: null,
      onCancel: null,
      onAuthorClick: action('onAuthorclick'),
      orangeLineAbove: false,
      timestamp: '',
    }),
  }
)

const load = () => {
  storiesOf('Chat/Conversation/Thread', module)
    .addDecorator(provider)
    .addDecorator(story => (
      <Box2 direction="vertical" fullWidth={true} fullHeight={true}>
        {story()}
      </Box2>
    ))
    .add('Normal', () => <Thread {...props} />)
}

export default load

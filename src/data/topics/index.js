import arrays from './arrays'
import linkedLists from './linked-lists'

const topics = {
  arrays,
  'linked-lists': linkedLists,
}

export function getTopic(slug) {
  return topics[slug] || null
}

export function getAllTopics() {
  return Object.values(topics)
}

export function getTopicSlugs() {
  return Object.keys(topics)
}

export default topics

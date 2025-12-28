import arrays from './arrays'

const topics = {
  arrays,
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

import dotenv from 'dotenv'
import errorReporter from './errorReporter'


dotenv.config()
errorReporter.client.report(new Error('faq example'))
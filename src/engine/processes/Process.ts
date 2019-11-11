import {cloneDeep} from 'lodash';
import { Response } from './Response'

/**
 * An abstraction for a generic process, which is an entity
 * that receives messages, performs some processing on them,
 * and returns them, asynchronously.
 *
 * Any message that is sent will be deep copied before being
 * operated on so that there can be no race conditions.
 *
 * Note that this doesn't guarantee a unique memory space (this
 * is javascript), and users can bypass this by provided shared
 * state to the constructor of process implementations.
 *
 * Processes should fail if they are unable to adequately process
 * the message or if the data enters an invalid state based on the
 * process's contract. It is up to a particular process
 * implementation as to whether the Promise should be rejected
 * within the implementation, or an exception should be thrown
 * out to the outer message.
 *
 * While the standard use case is that processes return their
 * response, they can also forward execution to another process
 * by sending a message to another process. In this case, the
 * process implementation can return a `Promise.resolve(true)`
 * if the contract states that it will not block or wait on
 * further processes. That being said, it can also provide the
 * option of blocking and allow users to decide whether to wait
 * or not.
 *
 * Sometimes, it might make sense not to provide copy the data
 * before sending it, for instance, in a chained process case,
 * like ForkJoinProcess. In these cases, the
 * `unsafeSend` method may be used instead. However, caution
 * should be used because this breaks the no shared state
 * between processes contract. Basically, it is safe to use the
 * unsafe send, if the sending process will not make use of the
 * contents of the message after forwarding it along. If it will
 * make use of the contents, it should use the safe `send`.
 */
export abstract class Process<M, R> {

    send(msg: M): Promise<R> {
        const copy = cloneDeep(msg);
        try {
            return this.receive(copy);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    unsafeSend(msg: M): Promise<R> {
        try {
            return this.receive(msg);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    protected abstract receive(msg: M): Promise<R>;
}
import { Mother } from './mother';

export class WordMother {
	static random(length?: number): string {
		const randomWord = Mother.random().lorem.word;
		return length ? randomWord(length) : randomWord();
	}
}

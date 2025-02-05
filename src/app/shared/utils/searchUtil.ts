import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap } from 'rxjs/operators';

export function useSearch<T>(fetchDataFn: (search: string) => Observable<T[]>): { searchTerm: BehaviorSubject<string>; data$: Observable<T[]> } {

  const searchTerm = new BehaviorSubject<string>('');

  const data$ = searchTerm.pipe(
    startWith(''),
    filter(search => search.length >= 3 || search.length === 0),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(fetchDataFn)
  );

  return {searchTerm, data$};
}

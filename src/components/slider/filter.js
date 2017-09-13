import Posts from '../posts';
import { reducer as filterReducer, filterActions } from 'redux-filter';

class Filters extends Component {

        sortItems() {
        const { sortItems, applySort } = this.props;
        const handleSortChange = (e) => {
            if (!e.target.value) return;
            const idx = e.target.value;
            applySort(sortItems[idx]);
        };
        return <select onChange={(e) => handleSortChange(e)} >
            <option value="" disabled>Sort Functions</option>
            {sortItems.map((item, idx) => {
                return <option key={idx} value={idx}>{item.title}</option>;
            })}
        </select>;
    }

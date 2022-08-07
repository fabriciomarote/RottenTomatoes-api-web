import '../styles/CategoryModel.css';

const CategoryModel = (props) => {

  const { category } = props;

  return (
    <>
      <div className='category-card-content'>
        <div className='category-name'>
          <a href={`/category/${category.id}`} className="link-category">
            <p className="c-name">{category.name}</p>
          </a>
        </div>       
      </div>
    </>
  )
}

export default CategoryModel;
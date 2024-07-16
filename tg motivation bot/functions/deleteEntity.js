async function deleteEntities(bot, entity, id) {
    const entities = ['progressinfo', 'goal', 'user','usergoals','quiz','result'];
    setTimeout(async ()=>{
      if (entities.includes(entity)) {
        const responseToDelete = await fetch(`http://localhost:3000/${entity}/${id}`, {
          method: 'DELETE'
        });
    
        if (responseToDelete.ok) {
          console.log(`${entity} с идентификатором ${id} был успешно удален.`);
        } else {
          console.error(`Ошибка при удалении ${entity} с идентификатором ${id}`);
        }
      } else {
        console.error('Недопустимая сущность для удаления');
      }
    },1000*60)
  }

module.exports = {deleteEntities};
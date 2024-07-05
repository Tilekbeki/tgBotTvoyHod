async function deleteEntities(entity, id) {
    const entities = ['progressinfo', 'goal', 'user'];
    if (entities.includes(entity)) {
      const responseToDelete = await fetch(`http://localhost:3000/${entity}/${id}`, {
        method: 'DELETE'
      });
  
      if (responseToDelete.ok) {
        // Обработка успешного удаления
        console.log(`${entity} с идентификатором ${id} был успешно удален.`);
      } else {
        // Обработка ошибки удаления
        console.error(`Ошибка при удалении ${entity} с идентификатором ${id}`);
      }
    } else {
      console.error('Недопустимая сущность для удаления');
    }
  }

module.exports = {deleteEntities};